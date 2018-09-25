import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
declare var Stripe: any;

@Component({
    //moduleId: module.id,
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css']
})

export class PaymentComponent implements OnInit {
    @Input() amount;
    stripe: any;
    card: any;
    @Output() token = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { this.init(); }

    init() {
        var current = this;
        this.stripe = Stripe('');
        var elements = this.stripe.elements();

        var card = elements.create('card', {
            style: {
                base: {
                    iconColor: '#666EE8',
                    color: '#31325F',
                    lineHeight: '40px',
                    fontWeight: 300,
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSize: '15px',

                    '::placeholder': {
                        color: '#CFD7E0',
                    },
                },
            }
        });
        card.mount('#card-element');
        card.on('change', function (event) {
            current.setOutcome(event);
        });
        
        document.querySelector('form').addEventListener('submit', function (e) {
            console.log("in submit")
            e.preventDefault();
            var form = document.querySelector('form')[0];
            console.log("in form",form)
            var extraDetails = {
                name: form.querySelector('input[name=cardholder-name]').value,
            };
            current.stripe.createToken(card, extraDetails).then(current.setOutcome);
        });
    }

    setOutcome(result) {
        var successElement = document.querySelector('.success');
        var errorElement = document.querySelector('.error');
        successElement.classList.remove('visible');
        errorElement.classList.remove('visible');

        if (result.token) {
            // Use the token to create a charge or a customer
            // https://stripe.com/docs/charges
            successElement.querySelector('.token').textContent = result.token.id;
            successElement.classList.add('visible');
        } else if (result.error) {
            errorElement.textContent = result.error.message;
            errorElement.classList.add('visible');
        }
    }
}