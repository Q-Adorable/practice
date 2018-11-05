package com.thoughtworks.contract.consumer.client;

import com.thoughtworks.contract.consumer.entity.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * @Author yywei
 **/
@FeignClient(value = "product-server", url = "${hlp.product-server.url}")
public interface ProductClient {

    @GetMapping("/products")
    List<Product> getAll();
}
