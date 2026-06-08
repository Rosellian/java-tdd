package com.tdd.api.pricing;

import com.tdd.api.pricing.rest.data.CartItemRequest;
import com.tdd.api.pricing.rest.data.CustomerRequest;
import com.tdd.api.pricing.rest.PricingRequest;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;
import com.tdd.tracing.debug.CustomerInfo;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class ServiceUtils {

    private ServiceUtils() {}

    public static CartSnapshot fromRequest(PricingRequest req) {
        List<CartItem> items = fromRequest(req.items());
        CustomerInfo customerInfo = req.customer() != null ? fromRequest(req.customer()) : null;

        return new CartSnapshot(items, customerInfo, req.context());
    }

    private static List<CartItem> fromRequest(List<CartItemRequest> items) {
        return items.stream()
                .map(ServiceUtils::fromRequest)
                .collect(toList());
    }

    private static CartItem fromRequest(CartItemRequest item) {
        String sku = item.sku();
        int quantity = item.quantity();

        return CartItem.from(sku, quantity);
    }

    private static CustomerInfo fromRequest(CustomerRequest customer) {
        return CustomerInfo.from(customer.id(), customer.segment());
    }
}
