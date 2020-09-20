from os import listdir
from PIL import Image
import json

images_path = "./sweet_photography/public/images/gallery"
output_filename = "./sweet_photography/src/settings/image_urls.json"

class ImageInfo:
    def __init__(self, image, _path):
        self.width, self.height = image.size
        self.path = _path

def get_file_names(path):
    return listdir(path)

def sort_images(imagePaths):
    images = {}
    for path in imagePaths:
        img = Image.open(images_path + "/" + path)
        img_obj = ImageInfo(img, path)
        
        if img_obj.height in images:
            images[img_obj.height].append(img)
        else:
            images[img_obj.height] = [ img ]
    
    for h in images:
        print(h)



sort_images(get_file_names(images_path))
