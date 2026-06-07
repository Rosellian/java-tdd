package com.tdd.api;

import com.tdd.api.rest.trace.CartItemRequest;
import com.tdd.api.rest.trace.CustomerRequest;
import com.tdd.api.rest.trace.PricingRequest;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;
import com.tdd.tracing.debug.CustomerInfo;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class ServiceUtils {

    private ServiceUtils() {}

    public static CartSnapshot fromRequest(PricingRequest req) {
        CartSnapshot cartSnapshot = new CartSnapshot();

        List<CartItem> items = fromRequest(req.getItems());
        cartSnapshot.setItems(items);

        if(req.getCustomer() != null) {
            cartSnapshot.setCustomer(fromRequest(req.getCustomer()));
        }

        if(req.getContext() != null) {
            cartSnapshot.setContext(req.getContext());
        }

        return cartSnapshot;
    }

    private static List<CartItem> fromRequest(List<CartItemRequest> items) {
        return items.stream()
                .map(ServiceUtils::fromRequest)
                .collect(toList());
    }

    private static CartItem fromRequest(CartItemRequest item) {
        String sku = item.getSku();
        int quantity = item.getQuantity();

        return CartItem.from(sku, quantity);
    }

    private static CustomerInfo fromRequest(CustomerRequest customer) {
        return CustomerInfo.from(customer.getId(), customer.getSegment());
    }
}
