from os import listdir
import json

images_path = "./sweet_photography/public/images/gallery"
output_filename = "./sweet_photography/src/settings/image_urls.json"
valid_file_formats = ['png', 'jpg', 'jpeg', 'svg']
def get_file_names(path):
    return listdir(path)

def create_image_urls(path):
    str_array = get_file_names(path)
    urls = []

    for imagePathName in str_array:
        string_parts = imagePathName.split("-")
        if (len(string_parts) > 1):
            file_name_parts = string_parts[1].split(".")
            if not file_name_parts[1].lower() in valid_file_formats:
                print (imagePathName, ' IS NOT A VALID FORMAT!')
            parameters = file_name_parts[0].split("_")
            if len(parameters) != 2:
                print (imagePathName , ' HAS MORE THAN LTH AND WTH!')
                continue
            if not parameters[0].isdigit() or not parameters[1].isdigit():
                print (imagePathName , ' IS NOT A VALID NAME!')
                continue
            url = "/cdn_cgi/image/width={},height={}/{}".format(parameters[0], parameters[1], imagePathName)
            if not url in urls:
                urls.append(url)
        else:
            print (imagePathName, 'IS AN INVALID FILE')
    return urls

def create_json_file(urls):
    with open(output_filename,'w') as outfile:
        json.dump(urls, outfile)

_urls = create_image_urls(images_path)
create_json_file(_urls)
