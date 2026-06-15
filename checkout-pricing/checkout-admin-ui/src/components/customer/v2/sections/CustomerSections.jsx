import {useState} from "react";
import {CustomerSection} from "./CustomerSection";

export function CustomerSections({ customer, originalCustomer, updateField }) {
    const [basicOpen, setBasicOpen] = useState(false);
    const [metaOpen, setMetaOpen] = useState(false);
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [preferencesOpen, setPreferencesOpen] = useState(false);

    const changedBasicInfo = JSON.stringify(customer.basicInfo) !== JSON.stringify(originalCustomer.basicInfo);
    const changedMeta = JSON.stringify(customer.metadata) !== JSON.stringify(originalCustomer.metadata);
    const changedOrders = JSON.stringify(customer.recentOrders) !==
        JSON.stringify(originalCustomer.recentOrders);
    const changedPreferences = JSON.stringify(customer.preferences) !==
        JSON.stringify(originalCustomer.preferences);

    return (
        <div>
            <CustomerSection label="Basic Info" updateField={updateField} open={basicOpen} setOpen={setBasicOpen}
                             field="basicInfo" changed={changedBasicInfo}
                             customer={customer} originalCustomer={originalCustomer} />

            <CustomerSection label="Metadata" updateField={updateField} open={metaOpen} setOpen={setMetaOpen}
                             field="metadata" changed={changedMeta}
                             customer={customer} originalCustomer={originalCustomer} />

            <CustomerSection label="Recent Orders" updateField={updateField} open={ordersOpen} setOpen={setOrdersOpen}
                             field="recentOrders" changed={changedOrders}
                             customer={customer} originalCustomer={originalCustomer} />

            <CustomerSection label="Preferences" updateField={updateField} open={preferencesOpen}
                             setOpen={setPreferencesOpen} field="preferences" changed={changedPreferences}
                             customer={customer} originalCustomer={originalCustomer} />
        </div>
    )
}