"""Flask API module for 3d Slicer
 
This module provides API to display a requested file on the 3d Slicer tool.
"""
import os
from flask import Flask
from flask_cors import CORS
from markupsafe import escape

app = Flask(__name__)
CORS(app)

root_dir = "/root/"
"""str: module-level root directory and file
 
Variable root_dir contains the path to the root directory of the project.
"""


@app.route("/uid/<uid>", methods=['POST'])
def update_bufferfile(uid):
    """Update the buffer.txt file

    Args:
        uid: str
            Study UID for the file requested.

    Returns:
        response: str
            Study UID accepted as input.
    """    
    filepath = os.path.join(root_dir, "data/", uid) + ".nii.gz"

    if os.path.exists(filepath):
        with open(os.path.join(root_dir, "buffer.txt"), "w") as buffer_file:
            buffer_file.write(filepath)

        return "Successfully loaded study on slicer"

    filepath = os.path.join(root_dir, "data/", uid) + ".dcm"

    if os.path.exists(filepath):
        with open(os.path.join(root_dir, "buffer.txt"), "w") as buffer_file:
            buffer_file.write(filepath)

        return "Successfully loaded study on slicer"

    return "Failed loading study on slicer"


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0")
