from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS, cross_origin
import model as Model
from bs4 import BeautifulSoup as Soup
from urllib.request import urlopen as ureq

app = FlaskAPI(__name__)
cors = CORS(app)

@app.route("/recommend", methods=['GET'])
def fetch():
    args = request.args
    if args:
        print (args)
        no1 = args['key1']
        no2 = args['key2']
        res = Model.recommend(no1, no2)
        return jsonify(dict(data=[no1, no2, res]))
    else:
        return notes
        



@app.route("/news", methods=['GET'])
def fetchnews():
    args = str(request.args['topic'])
    my_url = 'https://news.google.com/search?q=' + args + '&hl=en-IN&gl=IN&ceid=IN%3Aen'
    uClient = ureq(my_url)
    page_html = uClient.read()
    uClient.close()

    page_soup = Soup(page_html, "html.parser")
    titles = page_soup.findAll("h3", {"class": "ipQwMb ekueJc RD0gLb"})
    images = page_soup.findAll("img", {"class": "tvs3Id QwxBBf"})
    links = page_soup.findAll("a", {"class": "VDXfz"})
    ret = []
    for i in range(len(titles)):
        ret.append([titles[i].text])
    for i in range(len(images)):
        ret[i].append(images[i].get('src'))
    for i in range(len(links)):
        ret[i].append('https://news.google.com'+str(links[i].get('href'))[1:])
    return jsonify(ret) 


if __name__ == "__main__":
    app.run(debug=True)