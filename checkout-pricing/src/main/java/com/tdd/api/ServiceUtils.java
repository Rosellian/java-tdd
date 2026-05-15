package com.tdd.api;

import com.tdd.PricingRules;
import com.tdd.api.rest.trace.CartItemRequest;
import com.tdd.api.rest.trace.CustomerRequest;
import com.tdd.api.rest.trace.PricingRequest;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;
import com.tdd.tracing.debug.CustomerInfo;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class ServiceUtils {

    public static CartSnapshot fromRequest(PricingRequest req, PricingRules rules) {
        CartSnapshot cartSnapshot = new CartSnapshot();

        List<CartItem> items = fromRequest(req.getItems(), rules);
        cartSnapshot.setItems(items);

        if(req.getCustomer() != null) {
            cartSnapshot.setCustomer(fromRequest(req.getCustomer()));
        }

        if(req.getContext() != null) {
            cartSnapshot.setContext(req.getContext());
        }

        return cartSnapshot;
    }

    private static List<CartItem> fromRequest(List<CartItemRequest> items, PricingRules rules) {
        return items.stream()
                .map(item -> fromRequest(item, rules))
                .collect(toList());
    }

    private static CartItem fromRequest(CartItemRequest item, PricingRules rules) {
        String sku = item.getSku();
        int quantity = item.getQuantity();
        double unitPrice = rules.getUnitPrice(sku);

        return CartItem.from(sku, quantity, unitPrice);
    }

    private static CustomerInfo fromRequest(CustomerRequest customer) {
        return CustomerInfo.from(customer.getId(), customer.getSegment());
    }
}
