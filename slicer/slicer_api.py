"""Flask API module for 3d Slicer
 
This module provides API to display a requested file on the 3d Slicer tool.
"""
import os
import pandas as pd
from flask import Flask
from markupsafe import escape

app = Flask(__name__)

root_dir = "/root/"
csv_file = "data/db_nii.csv"
"""str: module-level root directory and file
 
Variable root_dir contains the path to the root directory of the project and 
csv_file contains the name of the CSV file which consists of UIDs and respective 
file paths.
"""


@app.route("/uid/<uid>")
def update_bufferfile(uid):
    """Update the buffer.txt file

    Args:
        uid: int
            Study UID for the file requested.

    Returns:
        response: str
            Study UID accepted as input.
    """
    df = pd.read_csv(os.path.join(root_dir, csv_file))
    df = df.set_index("uid")
    filepath = df.loc[uid, "filepath"]

    buffer_file = open(os.path.join(root_dir, "buffer.txt"), "w")
    buffer_file.write(filepath)
    buffer_file.close()

    response = "UID {}".format(uid)
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
