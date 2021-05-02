import pandas as pd
import numpy as np
import pandas as pd
import numpy as np
from flask import jsonify
import nltk
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import RegexpTokenizer
import re
import string
import random
from PIL import Image
import requests
from io import BytesIO
import matplotlib.pyplot as plt



df = pd.read_csv("goodread.csv")
df2 = df.copy()

# Function for removing NonAscii characters
def _removeNonAscii(s):
    return "".join(i for i in s if  ord(i)<128)
# Function for converting into lower case
def make_lower_case(text):
    return text.lower()
# Function for removing stop words
def remove_stop_words(text):
    text = text.split()
    stops = set(stopwords.words("english"))
    text = [w for w in text if not w in stops]
    text = " ".join(text)
    return text
# Function for removing punctuation
def remove_punctuation(text):
    tokenizer = RegexpTokenizer(r'\w+')
    text = tokenizer.tokenize(text)
    text = " ".join(text)
    return text
#Function for removing the html tags
def remove_html(text):
    html_pattern = re.compile('<.*?>')
    return html_pattern.sub(r'', text)
# Applying all the functions in description and storing as a cleaned_desc

df2['cleaned_desc'] = df2['Desc'].apply(_removeNonAscii)
df2['cleaned_desc'] = df2.cleaned_desc.apply(func = make_lower_case)
df2['cleaned_desc'] = df2.cleaned_desc.apply(func = remove_stop_words)
df2['cleaned_desc'] = df2.cleaned_desc.apply(func=remove_punctuation)
df2['cleaned_desc'] = df2.cleaned_desc.apply(func=remove_html)

def recommend_title(title, genre):
    data = df2.loc[df2['genre'] == genre]  
    data.reset_index(level = 0, inplace = True) 
    indices = pd.Series(data.index, index = data['title'])
    tf = TfidfVectorizer(analyzer='word', ngram_range=(2, 2), min_df = 1, stop_words='english')
    tfidf_matrix = tf.fit_transform(data['title'])
    sg = cosine_similarity(tfidf_matrix, tfidf_matrix)
    idx = indices[title]
    sig = list(enumerate(sg[idx]))
    sig = sorted(sig, key=lambda x: x[1], reverse=True)
    sig = sig[1:6]
    movie_indices = [i[0] for i in sig]
    rec = data[['title', 'image_link']].iloc[movie_indices]
    recd = rec.to_dict()
    print(rec)


def recommend(title, genre):
    global rec
    data = df2.loc[df2['genre'] == genre]  
    data.reset_index(level = 0, inplace = True) 
    indices = pd.Series(data.index, index = data['title'])
    tf = TfidfVectorizer(analyzer='word', ngram_range=(2, 2), min_df = 1, stop_words='english')
    tfidf_matrix = tf.fit_transform(data['cleaned_desc'])
    sg = cosine_similarity(tfidf_matrix, tfidf_matrix)
    idx = indices[title]
    sig = list(enumerate(sg[idx]))
    sig = sorted(sig, key=lambda x: x[1], reverse=True)
    sig = sig[1:6]
    movie_indices = [i[0] for i in sig]
    rec = data[['title', 'image_link']].iloc[movie_indices]
    return rec.to_dict()

recommend("Silence", "Non-Fiction")