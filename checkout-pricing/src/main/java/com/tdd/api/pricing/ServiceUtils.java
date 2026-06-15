package com.tdd.api.pricing;

import com.tdd.api.pricing.rest.data.CartItemRequest;
import com.tdd.api.pricing.rest.data.CustomerRequest;
import com.tdd.api.pricing.rest.PricingRequest;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;
import com.tdd.tracing.debug.CustomerInfo;

import java.util.List;
import java.util.Map;

import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.stream.Collectors.toList;

public class ServiceUtils {

    private ServiceUtils() {}

    public static CartSnapshot fromRequest(PricingRequest req) {
        List<CartItem> items = fromRequest(req.items());

        CustomerRequest customer = req.customer();
        CustomerInfo customerInfo = customer != null ? fromRequest(customer) : null;

        return new CartSnapshot(items, customerInfo, req.context());
    }

    private static List<CartItem> fromRequest(List<CartItemRequest> items) {
        return items.stream()
                .map(ServiceUtils::fromRequest)
                .collect(toList());
    }

    private static CartItem fromRequest(CartItemRequest item) {
        return CartItem.from(item.sku(), item.quantity());
    }

    private static CustomerInfo fromRequest(CustomerRequest customer) {
        Map<String, Object> basicInfo = customer.basicInfo() != null ? customer.basicInfo() : emptyMap();
        Map<String, Object> metadata = customer.metadata() != null ? customer.metadata() : emptyMap();
        List<Map<String, Object>> recentOrders = customer.recentOrders() != null ? customer.recentOrders() : emptyList();
        Map<String, Object> preferences = customer.preferences() != null ? customer.preferences() : emptyMap();

        return new CustomerInfo(customer.id(), customer.segment(), basicInfo, metadata, recentOrders, preferences);
    }
}
