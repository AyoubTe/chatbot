import random
import json

import torch

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "ChatBotResevationHelp"


def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                result = dict(tag=tag, response=random.choice(intent['responses']))
                return result
                #return random.choice(intent['responses'])

    return dict(tag="sujet_inconnu", response="Désolé, je ne comprends pas...")


if __name__ == "__main__":
    print("Commencant le chat! (tape 'quit' pour quitter)")
    while True:
        # sentence = "Je veux faire une réservation"
        sentence = input("Toi: ")
        if sentence == "quit":
            break

        response = get_response(sentence)["response"]
        print(bot_name+": "+response)
