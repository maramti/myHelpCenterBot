import nltk
import string
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize 
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')
lemmatizer=WordNetLemmatizer()
text="I am maram ben mohamed, This is first try!"
def preprocessing(text):
    tokens=word_tokenize(text)
    stop_words=set(stopwords.words("english"))
    filtered_list=[token for token in tokens if token.casefold() not in stop_words]
    lemmed_words=[lemmatizer.lemmatize(item) for item in filtered_list ]
    st=[word.lower() for word in lemmed_words]
    translator=str.maketrans('', '', string.punctuation)
    cleaned_words = [word.translate(translator) for word in lemmed_words if word.translate(translator)]
    return cleaned_words
print(preprocessing(text))


