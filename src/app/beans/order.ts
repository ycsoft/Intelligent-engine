export class Order {
    email = '';
    invoice = false;
    inv = null;
    contacts = '';
    phone = '';
    province = '';
    city = '';
    address = '';
    pay_type = '';
    company_name = '';
    company_addr = '';
    bank_account = '';
    open_bank = '';
    tax_no = '';
    rules = '';
    order_no = '';
    total_amount = 0;

    constructor() {
        this.inv = {
            type: 'common',
            header: ''
        };
    }
}
