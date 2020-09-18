from os import listdir
import json

images_path = "./sweet_photography/public/images/gallery"
output_filename = "./sweet_photography/src/settings/image_urls.json"

def get_file_names(path):
    return listdir(path)

def create_image_urls(path):
    return get_file_names(path)

def create_json_file(urls):
    with open(output_filename,'w') as outfile:
        json.dump(urls, outfile)

_urls = create_image_urls(images_path)
create_json_file(_urls)