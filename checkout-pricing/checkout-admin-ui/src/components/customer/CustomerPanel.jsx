import {Section} from "../../ui/Section";
import {CustomerItem} from "./customeritem/CustomerItem";
import {CustomerJsonLoader} from "./loader/CustomerJsonLoader";

export function CustomerPanel({ customer, setCustomer, originalCustomer }) {

    function updateField(key, value) {
        setCustomer(prev => ({ ...prev, [key]: value }));
    }

    return (
        <Section title="Customer">
            <CustomerItem customer={customer} updateField={updateField} originalCustomer={originalCustomer} />

            <CustomerJsonLoader customer={customer} onImport={(json) => setCustomer(json)} />
        </Section>
    )
}