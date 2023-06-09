import os
import sys
from pathlib import Path

from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import json

from PIL import Image
from io import BytesIO
import base64


from code import lol



class JsonDatabase():
    name = "database"


    DATABASE_SRC = str(Path(os.getcwd()).parent.absolute()) +"front"+"/hacaton-app" + "/frontend" + "/public"

    path = f"{DATABASE_SRC}/{name}.json"
    def getImageById(self,id):
        f = open(self.path)
        data = json.load(f)
        img = data[str(id)]
        f.close()
        return img

    def reWriteNote(self,id, note):
        f = open(self.path)
        data = json.load(f)
        img = data[str(id)]
        img['notes'] = note
        data[str(id)] = img
        f.close()
        json_object = json.dumps(data, indent=4)
        with open(self.path, "w") as outfile:
            outfile.write(json_object)

    def removeImage(self,id):
        f = open(self.path)
        data = json.load(f)
        data.pop(str(id))
        f.close()
        json_object = json.dumps(data, indent=4)
        with open(self.path, "w") as outfile:
            outfile.write(json_object)

    def highlightImage(self,id):
        f = open(self.path)
        data = json.load(f)
        img = data[str(id)]
        img['highlighted'] = True
        data[str(id)] = img
        f.close()
        json_object = json.dumps(data, indent=4)
        with open(self.path, "w") as outfile:
            outfile.write(json_object)


    def getDatabase(self):
        f = open(self.path)
        print(f)
        data = json.load(f)
        f.close()
        return data
    def insertToDatabase(self, image):
        data = None

        try:
            f = open(self.path)
            data = json.load(f)
            data[str(image["image_id"])] = image
            f.close()
            json_object = json.dumps(data, indent=4)
            with open(self.path, "w") as outfile:
                outfile.write(json_object)

        except:
            data = {image["image_id"]:image}
            json_object = json.dumps(data, indent=4)
            with open(self.path,'w') as outfile:
                outfile.write(json_object)




class ImageInfoView(APIView):
    database = JsonDatabase()
    def post(self, request):
        print(lol())
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            img = self.database.getImageById(request.data["image_id"])
            return Response(img)




class DeleteImageView(APIView):
    def post(self, request):
        database = JsonDatabase()
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            database.removeImage(request.data['image_id'])
            return Response("d")

class HighlightImageView(APIView):
    database = JsonDatabase()
    def post(self, request):
        database = JsonDatabase()
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            database.highlightImage(request.data['image_id'])
            return Response("d")



class ReWriteNote(APIView):
    database = JsonDatabase()

    def post(self, request):
        database = JsonDatabase()
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            database.reWriteNote(
                id = request.data['image_id'],
                note = request.data['note']
            )
            return Response("d")

class ImageServiceView(APIView):

    database = JsonDatabase()



    def get(self, request):
        data = self.database.getDatabase()
        print(data)
        detail = [data[x] for x in data]
        return Response(detail)

    def post(self, request):
        serializer = SendImageSerializer(data=request.data)
        path = Path(os.getcwd())
        print(os.getcwd())
        print(str(path.parent.absolute()) + "/frontend" + "/public")

        print(request.data['image_id'])
        bytes = request.data['src']
        with open("imageToSave.png", "wb") as fh:
            fh.write(base64.decodebytes(bytes))

        if serializer.is_valid(raise_exception=True):
            # img = {
            #         "image_id": request.data['image_id'],
            #         "file_src":request.data['src'],
            #         "swans_count": 0,
            #         "shipuns_count": 3,
            #         "clikuns_count": 1,
            #         "small_count": 4,
            #         "unrecognized_count": 2,
            #         "name": "wedfg",
            #         "date": "12.02.2002",
            #         "highlighted": False,
            #         "notes": ""
            #     }
            # self.database.insertToDatabase(img)
            return Response("img")

class UploadImageView():
    def post(self, request):
        serializer = UploadimageSerializer(data=request.data)
        path = Path(os.getcwd())
        if serializer.is_valid(raise_exception=True):

            return Response(img)