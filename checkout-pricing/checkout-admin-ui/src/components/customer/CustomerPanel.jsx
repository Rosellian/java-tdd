import {Section} from "../../ui/Section";
import {CustomerItem} from "./customeritem/CustomerItem";

export function CustomerPanel({ customer, setCustomer, originalCustomer }) {

    function updateField(key, value) {
        setCustomer(prev => ({ ...prev, [key]: value }));
    }

    return (
        <Section title="Customer">
            <CustomerItem customer={customer} updateField={updateField} originalCustomer={originalCustomer} />
        </Section>
    )
}