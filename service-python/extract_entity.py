import re

#regex entities (pattern-based) 
order_number= r"#[1-9]{4}\b"
date_pattern=r"\b(?:today|tomorrow|yesterday|next week|next month)\b"  #\b indique qu'il y a un espace entre le caractère lettre/nb et caractère non lettre
price_pattern=r"\b\d+(?:\.\d{1,2})?\s?(?:\$|€|DT)"
size_pattern=r"\b(m|s|xs|l|xl)\b"
location_list=['house','home']
country_list=['tunisia','france','usa']
def extract_entity(input):
    entities=[]
    low=input.lower()
    matches=re.findall(order_number,low)
    for match in matches :
        entities.append({'type':'order_number','value':match})
    
    dates=re.findall(date_pattern,low)
    for date in dates :
        entities.append({'type':'date','value':date})

    prices=re.findall(price_pattern,low)
    for price in prices :
        entities.append({'type':'price','value':price})

    sizes=re.findall(size_pattern,low)
    for size in sizes :
        entities.append({'type':'size','value':size})
    
#location is not a regex pattern it's a list so we don't use findall 
    for loc in location_list:
        if loc in low:
            entities.append({'type':'location','value':loc})

    for con in country_list:
        if con in low:
            entities.append({'type':'country','value':con})
   
    return(entities)

