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
        } {
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
