import re

#regex entities (pattern-based) 
#order_number= \b#[1-9]{4}\b
#date=/\b(?:\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|today|tomorrow|yesterday|next week|next month)\b
price=
size='M|S|XS|L|XL'
location=['house','home']
countries=['Tunisia','France','USA']

def find(input):
    entity=re.findall(entities,input)
    return entity