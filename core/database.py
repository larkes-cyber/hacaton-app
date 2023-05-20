import json

class JsonDatabase():
    name = "database"

    def getDatabase(self):
        f = open(f'{self.name}.json')
        data = json.load(f)
        f.close()
        return data
    def insertToDatabase(self, image):
        data = None

        try:
            f = open(f'{self.name}.json')
            data = json.load(f)
            data[str(image["image_id"])] = image
            f.close()
            json_object = json.dumps(data, indent=4)
            with open(f"{self.name}.json", "w") as outfile:
                outfile.write(json_object)

        except:
            data = {image["image_id"]:image}
            json_object = json.dumps(data, indent=4)
            with open(f"{self.name}.json", "w") as outfile:
                outfile.write(json_object)



