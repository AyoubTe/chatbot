class Chatbox {
    constructor() {
        this.args = {
            openButton: document.getElementById('chatbot-toggle-btn'),
            chatBox: document.querySelector('.chatbot-popup'),
            closeBtn: document.getElementById('close-btn'),
            sendButton: document.getElementById('send-btn'),
            userInput: document.getElementById('user-input'),
            chatMessages: document.getElementById('chat-box')
        };

        this.messages = [];
        this.currentContext = null;
    }

    display() {
        const { openButton, closeBtn, sendButton, userInput, chatBox } = this.args;

        openButton.addEventListener('click', () => {
            chatBox.style.display = 'block';
            this.toggleState();
        });

        closeBtn.addEventListener('click', () => {
            chatBox.style.display = 'none';
            this.toggleState();
        });

        sendButton.addEventListener('click', () => this.onSendButton(userInput));

        userInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.onSendButton(userInput);
            }
        });
    }

    toggleState() {
        const { chatBox } = this.args;
        chatBox.classList.toggle('chatbox--active');
    }

    onSendButton(inputField) {
        const message = inputField.value.trim();
        if (message === '') return;

        if (this.currentContext === 'modify_reservation') {
            if (!this.messages.find(msg => msg.type === 'BookingNumber')) {
                this.messages.push({ name: 'User', type: 'BookingNumber', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'S\'il vous plait indiquer la nouvelle date: ' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'NewDate')) {
                this.messages.push({ name: 'User', type: 'NewDate', message });
                this.updateChat();
                inputField.value = '';
                this.currentContext = null;
                this.messages.push({ name: 'ChatBot', message: 'Votre reservation a ete modifiee avec succes.' });
                this.updateChat();
                return;
            }
        } else if (this.currentContext === 'book_hotel') {
            if (!this.messages.find(msg => msg.type === 'NameH')) {
                this.messages.push({ name: 'User', type: 'NameH', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Donner votre nom s\'il vous plait: ' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'ClientName')) {
                this.messages.push({ name: 'User', type: 'ClientName',message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Saisir votre email s\'il vous plait: ' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'EmailH')) {
                this.messages.push({ name: 'User', type: 'EmailH', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Donner le nombre des chambres a reservees: ' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'NbRooms')) {
                this.messages.push({ name: 'User', type: 'NbRooms', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Donner la duree de reservation: ' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'Duration')) {
                this.messages.push({ name: 'User', type: 'Duration', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Donner la date de reservation: ' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.name === 'DateH')) {
                this.messages.push({ name: 'User', type: 'DateH', message });
                this.updateChat();
                inputField.value = '';
                this.currentContext = null; // Reset context
                this.messages.push({ name: 'ChatBot', message: 'Votre reservation a ete confirmee avec succes.' });
                this.updateChat();
                return;
            }
        } else if (this.currentContext === 'book_flight') {
            if (!this.messages.find(msg => msg.type === 'DestinationF')) {
                this.messages.push({ name: 'User', type: 'DestinationF', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Quelle est la ville de depart?' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'DepartF')) {
                this.messages.push({ name: 'User', type: 'DepartF', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Donner votre email.' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'EmailF')) {
                this.messages.push({ name: 'User', type:'EmailF', message });
                this.updateChat();
                inputField.value = '';
                this.messages.push({ name: 'ChatBot', message: 'Donner la date de votre vol: ' });
                this.updateChat();
                return;
            } else if (!this.messages.find(msg => msg.type === 'DateF')) {
                this.messages.push({ name: 'User', type: 'DateF', message });
                this.updateChat();
                inputField.value = '';
                this.currentContext = null; // Reset context
                this.messages.push({ name: 'ChatBot', message: 'Votre reservation a ete confirmee avec succes.' });
                this.updateChat();
                return;
            }
        } else if (this.currentContext === 'cancel_reservation') {
            this.messages.push({ name: 'User', message });
            this.updateChat();
            inputField.value = '';
            this.currentContext = null; // Reset context
            this.messages.push({ name: 'ChatBot', message: 'Votre reservation a ete annulee avec succes.' });
            this.updateChat();
            return;
        } else if (this.currentContext === 'recommendations') {
            this.messages.push({ name: 'User', message });
            this.updateChat();
            let input = inputField.value.trim().toLowerCase();
            inputField.value = '';
            switch (input) {
                case "plage" :
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Pour des vacances balnéaires, direction Maldives. Ses plages de sable blanc, ses eaux turquoise et ses bungalows sur pilotis vous offriront une expérience paradisiaque.' });
                    break;
                case "montagne":
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Pour les amateurs de montagnes, rendez-vous dans les Alpes suisses. Profitez des panoramas a couper le souffle, des pistes de ski et de l’air pur en altitude.' });
                    break;

                case "ville":
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Si vous preferez l’effervescence urbaine, New York est un choix incontournable. Decouvrez ses gratte-ciel emblematiques, ses musees de renommee mondiale et sa vie nocturne animee.' });
                    break;

                case "internationales":
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Si vous cherchez une expérience internationale, Kyoto au Japon est un choix magnifique. Admirez les temples anciens, les jardins zen et la beaute des cerisiers en fleurs.' });
                    break;

                case "locales":
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Pour une escapade nationale, je vous suggere de visiter Marrakech au Maroc. Explorez les souks animes, decouvrez la médina historique et profitez de la cuisine locale.' });
                    break;

                case "culture":
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Pour un voyage axe sur la culture, rendez-vous à Rome, en Italie. Explorez le Colisée, la chapelle Sixtine et dégustez une delicieuse cuisine italienne.' });
                    break;

                case "nature":
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Pour une experience proche de la nature, je vous conseille de visiter Banff National Park au Canada. Explorez ses lacs cristallins, ses forrts denses et ses majestueuses montagnes.' });
                    break;

                case "detente":
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Si vous avez besoin de vous detendre, optez pour Bali, en Indonesie. Profitez des plages de sable blanc, des spas luxueux et de la tranquillite de l’ile' });
                    break;
                default :
                    this.currentContext = null;
                    this.messages.push({ name: 'ChatBot', message: 'Bien sûr ! Voici quelques recommandations de destinations qui pourraient vous intéresser :\n' +
                            '\n' +
                            'Pour les amateurs de plage et de soleil : Les Maldives, les Seychelles ou Bali offrent des plages de sable blanc et des eaux cristallines parfaites pour la détente et les sports nautiques.\n' +
                            '\n' +
                            'Pour les aventuriers : Le parc national de Yellowstone aux États-Unis, les montagnes Rocheuses au Canada ou le circuit de randonnée du Tour du Mont Blanc en Europe offrent des paysages à couper le souffle et de nombreuses activités de plein air.\n' +
                            '\n' +
                            'Pour les amateurs de culture et d\'histoire : Rome en Italie, Kyoto au Japon ou Le Caire en Égypte offrent une richesse historique et culturelle avec leurs monuments anciens, musées et traditions locales.\n' +
                            '\n' +
                            'Pour les gourmands : Paris en France, Bangkok en Thaïlande ou San Sebastian en Espagne sont des destinations incontournables pour les amoureux de la gastronomie et de la cuisine locale.\n' +
                            '\n' +
                            'Pour les amoureux de la nature : La forêt amazonienne au Brésil, les fjords de Norvège ou les paysages volcaniques de l\'Islande sont parfaits pour ceux qui souhaitent se reconnecter avec la nature.' });
                    break;
            }
            this.messages.push({ name: 'ChatBot', message: 'N’hésitez pas à me donner plus de détails sur vos préférences, et je pourrai affiner mes recommandations ! 🌿🌎🏞️🏙️🏔️🏖️' });
            this.updateChat();
            return;
        } else {
            this.messages.push({ name: 'User', message });
            this.updateChat();
        }

        fetch($SCRIPT_ROOT + '/chat', {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            this.processBotResponse(data);
        })
        .catch(error => {
            console.error('Error:', error);
            this.messages.push({ name: 'ChatBot', message: 'Desole, une erreur s\'est produite lors du traitement de votre demande.' });
            this.updateChat();
        });

        inputField.value = '';
    }

    processBotResponse(responseData) {
        const { userInput, chatMessages } = this.args;

        if (responseData.context === 'modify_reservation') {
            this.currentContext = 'modify_reservation';
            this.messages.push({ name: 'ChatBot', message: responseData.answer });
            this.updateChat();
        } else if (responseData.context === 'cancel_reservation') {
            this.currentContext = 'cancel_reservation';
            this.messages.push({ name: 'ChatBot', message: responseData.answer });
            this.updateChat();
        } else if (responseData.context === 'book_flight') {
            this.currentContext = 'book_flight';
            this.messages.push({ name: 'ChatBot', message: responseData.answer });
            this.updateChat();
        } else if (responseData.context === 'book_hotel') {
            this.currentContext = 'book_hotel';
            this.messages.push({ name: 'ChatBot', message: responseData.answer });
            this.updateChat();
        } else if (responseData.context === 'recommendations') {
            this.currentContext = 'recommendations';
            this.messages.push({ name: 'ChatBot', message: responseData.answer });
            this.updateChat();
        } else if (responseData.context === 'sujet_inconnu') {
            this.messages.push({ name: 'ChatBot', message: responseData.answer });
            this.updateChat();
            this.messages.push({ name: 'ChatBot', message: 'Etes-vous besoin d\aide d\'un expert' });
            this.updateChat();
            const buttonYes = document.createElement('button');
            buttonYes.textContent = '✔ Yes';
            buttonYes.onclick = () => {
                this.messages.push({ name: 'ChatBot', message: 'S\'il vous plait attendre. Un assistant va s\'en charger de repondre a vos question?' });
                this.updateChat();
            };
            const buttonNo = document.createElement('button');
            buttonNo.textContent = '✖ No';
            buttonNo.onclick = () => {
                this.messages.push({ name: 'ChatBot', message: 'Ok, si vous changer d\'avis laisser moi le savoir!' });
                this.updateChat();
            };
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            buttonContainer.appendChild(buttonYes);
            buttonContainer.appendChild(buttonNo);
            chatMessages.appendChild(buttonContainer); 
        } else {
            this.messages.push({ name: 'ChatBot', message: responseData.answer });
            this.updateChat();
        }
    }

    updateChat() {
        const { chatMessages } = this.args;
        let html = '';

        this.messages.forEach(msg => {
            if (msg.name === 'User') {
                html += `<div class="user-message">${msg.message}</div>`;
            } else if (msg.name === 'ChatBot') {
                html += `<div class="bot-message">${msg.message}</div>`;
            }
        });

        chatMessages.innerHTML = html;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

const chatbox = new Chatbox();
chatbox.display();
