import numpy as np
import qt
import os
from glob import glob
import json

FILE = '/home/ec2-user/Desktop/project_slicer/buffer.txt'
ANNOTATIONS_DIR = '/home/ec2-user/annotations'

def flip_dicoms():
    sliceNode = slicer.app.layoutManager().sliceWidget('Red').mrmlSliceNode()
    sliceToRas = sliceNode.GetSliceToRAS()
    transform = vtk.vtkTransform()
    transform.SetMatrix(sliceToRas)
    transform.RotateZ(180)
    sliceToRas.DeepCopy(transform.GetMatrix())
    sliceNode.UpdateMatrices()

def brainWindow(volumenode):
    displaynode = volumenode.GetDisplayNode()
    displaynode.AutoWindowLevelOff()
    displaynode.SetWindowLevel(100, 50)


def load_dicom_volume_from_folder(path):
    print('Loading file {}'.format(path))
    studyUID = os.path.basename(path)[:-len('.nii.gz')]
    already_segmented = os.path.exists(os.path.join(ANNOTATIONS_DIR, studyUID))
    print('already_segmented', already_segmented)

    if already_segmented:
        try:
            volumefile = os.path.join(ANNOTATIONS_DIR, studyUID, studyUID + '.nrrd')
            segmentationfile = os.path.join(ANNOTATIONS_DIR, studyUID, studyUID + '.seg.nrrd')
            volumenode = slicer.util.loadVolume(volumefile, {'singleFile': True, 'discardOrientation': True, 'show': True})
            segmentationnode = slicer.util.loadSegmentation(segmentationfile, {'singleFile': True, 'discardOrientation': True, 'show': True})
        except Exception as e:
            print(e)

        try:
            json_files = glob(os.path.join(ANNOTATIONS_DIR, studyUID, '*.json'))
            json_files = [file_ for file_ in json_files if 'resampled' not in file_]
            json_files = [file_ for file_ in json_files if 'ijk' not in file_]
            for json_file in json_files:
                slicer.util.loadMarkups(json_file)
        except Exception as e:
            print(e)

    else:
        try:
            volumenode = slicer.util.loadVolume(path, {'singleFile': True, 'center': False, 'discardOrientation': True, 'show': True})
        except Exception as e:
            print(e)
        
        add_segmentation_node(studyUID)
    appLogic = slicer.app.applicationLogic()
    interactionNode = appLogic.GetInteractionNode()
    interactionNode.SetCurrentInteractionMode(slicer.vtkMRMLInteractionNode.AdjustWindowLevel)
    flip_dicoms()
    brainWindow(volumenode)


def get_filepath():
    filepath = open(FILE).read().strip()
    return filepath

def toggleSphereBrush():
    segmentEditorWidget = slicer.modules.segmenteditor.widgetRepresentation().self().editor
    painteffect = segmentEditorWidget.effectByName("Paint")
    isSphere = painteffect.integerParameter('BrushSphere')
    painteffect.setCommonParameter("BrushSphere", 0 if isSphere else 1)


already_updated = ['']
def update_display():
    filepath = get_filepath()
    slicer.util.findChild(slicer.util.mainWindow(), 'LogoLabel').visible = False
    
    defaultSegmentEditorNode = slicer.vtkMRMLSegmentEditorNode()
    defaultSegmentEditorNode.SetOverwriteMode(slicer.vtkMRMLSegmentEditorNode.OverwriteNone)
    slicer.mrmlScene.AddDefaultNode(defaultSegmentEditorNode)

    if str(already_updated[-1]) != filepath :
        if str(already_updated[-1]) != '':
            save_all(already_updated[-1])
        slicer.mrmlScene.Clear(False)
        load_dicom_volume_from_folder(filepath)
        already_updated.append(filepath)
    else:
        if str(already_updated[-1]) != '':
            assign_colors_for_segmentation()
            markupnodes = list(slicer.mrmlScene.GetNodesByClass("vtkMRMLMarkupsNode"))
            for node in markupnodes:
                mDisplayNode = node.GetDisplayNode()
                mDisplayNode.SetLineColorFadingStart(0.5)
                mDisplayNode.SetLineColorFadingEnd(1)
        
    qt.QTimer.singleShot(1000, update_display)


def assign_colors_for_segmentation():
    try:
        segment_node = getNode('vtkMRMLSegmentationNode1')
        segmentation = segment_node.GetSegmentation()
        segmentation.GetSegment('1').SetColor(0.5, 0, 0.125)
        #segmentation.GetSegment('2').SetColor(0, 0.4, 0)
        segmentation.GetSegment('3').SetColor(0.4, 1, 1)
        segmentation.GetSegment('4').SetColor(1, 0.6, 1)
    except slicer.util.MRMLNodeNotFoundException:
        return


def add_segmentation_node(studyUID):
    seg = slicer.mrmlScene.AddNewNodeByClassWithID('vtkMRMLSegmentationNode', studyUID, 'vtkMRMLSegmentationNode1')
    fda = True
    seg.GetSegmentation().AddEmptySegment("1", "Intracranial hyperdensities")
    seg.GetSegmentation().AddEmptySegment("3", "Left lateral ventricle")
    seg.GetSegmentation().AddEmptySegment("4", "Right lateral ventricle")


def save_all(filepath, annotations_dir=ANNOTATIONS_DIR):
    nodes = getNodesByClass('vtkMRMLScalarVolumeNode')
    assert len(nodes) == 1
    node = nodes[0]
    studyUID = os.path.basename(filepath)[:-len('.nii.gz')]
    dir_path = os.path.join(annotations_dir, studyUID)
    segnodes = getNodesByClass('vtkMRMLSegmentationNode')
    print(segnodes)
    if len(segnodes) == 1:
        if not os.path.exists(dir_path):
            print('{} does not exists, Creating directory.'.format(dir_path))
            os.mkdir(dir_path)
        segnode = segnodes[0]
        slicer.util.saveNode(segnode, os.path.join(dir_path, studyUID + '.seg.nrrd'))
        slicer.util.saveNode(node, os.path.join(dir_path, studyUID + '.nrrd'))
    markupnodes = getNodesByClass('vtkMRMLMarkupsNode')
    markuplinenodes = [node for node in markupnodes if 'MarkupsLine' in str(node)]
    markupcurvenodes = [node for node in markupnodes if 'MarkupsCurve' in str(node)]
    for i, markupnode in enumerate(markuplinenodes):
        slicer.util.saveNode(markupnode, os.path.join(dir_path, f'L_{str(i)}.mrk.json'))
    for i, markupnode in enumerate(markupcurvenodes):
        slicer.util.saveNode(markupnode, os.path.join(dir_path, f'C_{str(i)}.mrk.json'))
    save_resampled_points(markupcurvenodes, dir_path)
    save_as_ijk(markupcurvenodes, dir_path, 'C')
    save_as_ijk(markuplinenodes, dir_path, 'L')
    print('Saving all segmentations to {}'.format(dir_path))

def get_ijk_point(pt):
    volumeID = 'vtkMRMLScalarVolumeNode1'
    coordsXYZ = [0, 0, 0]
    sliceNode = getNode('vtkMRMLSliceNodeRed')
    appLogic = slicer.app.applicationLogic()
    sliceLogic = appLogic.GetSliceLogic(sliceNode)
    layerLogic = sliceLogic.GetBackgroundLayer()
    slicer.vtkMRMLAbstractSliceViewDisplayableManager.ConvertRASToXYZ(sliceNode,pt,coordsXYZ)
    xytoIJK = layerLogic.GetXYToIJKTransform()
    coordsIJK = xytoIJK.TransformDoublePoint(coordsXYZ)
    coordsIJK = list(map(int, coordsIJK))
    return coordsIJK

def save_as_ijk(markupnodes, dir_path, prefix):
    for i, node in enumerate(markupnodes):
        try:
            currentPoints = node.GetCurvePointsWorld()
            all_points = {'0': [], '1': [], '2': []}
            for controlpoint in range(0, currentPoints.GetNumberOfPoints()):
                pt = [0, 0, 0]
                currentPoints.GetPoint(controlpoint, pt)
                pt_ijk = get_ijk_point(pt)
                for i in range(3):
                    all_points[str(i)].append(pt_ijk[i])
        
            with open(os.path.join(dir_path, f'ijk_{prefix}_{str(i)}.json'),'w') as fp:
                json.dump(all_points, fp)
        except AttributeError:
            continue

def save_resampled_points(markupcurvenodes, dir_path):
    resampleNumber = 50
    for i, markupcurvenode in enumerate(markupcurvenodes):
        currentPoints = markupcurvenode.GetCurvePointsWorld()
        newPoints = vtk.vtkPoints()
        sampleDist = markupcurvenode.GetCurveLengthWorld()/(resampleNumber - 1)
        closedCurveoption = 0
        markupcurvenode.ResamplePoints(currentPoints, newPoints, sampleDist, closedCurveoption)

        all_points = {'0': [], '1': [], '2': []}
        for controlpoint in range(0, newPoints.GetNumberOfPoints()):
            pt = [0, 0, 0]
            newPoints.GetPoint(controlpoint, pt)
            pt_ijk = get_ijk_point(pt)
            for i in range(3):
                all_points[str(i)].append(pt_ijk[i])
        with open(os.path.join(dir_path, f'resampled_C_{str(i)}.json'), 'w') as fp:
            json.dump(all_points, fp)

def Register_Shortcuts():

    shortcuts = [
        ('s', lambda: save_all(already_updated[-1])),
        ('b', lambda: toggleSphereBrush())
        ]

    for (shortcutKey, callback) in shortcuts:
        shortcut = qt.QShortcut(slicer.util.mainWindow())
        shortcut.setKey(qt.QKeySequence(shortcutKey))
        shortcut.connect( 'activated()', callback)

def empty_buffer_file():
    file_ = open(FILE, "r+")
    file_.truncate(0)
    file_.close()

empty_buffer_file()
Register_Shortcuts()
update_display()

