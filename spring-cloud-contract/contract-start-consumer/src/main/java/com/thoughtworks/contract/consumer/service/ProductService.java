package com.thoughtworks.contract.consumer.service;

import com.thoughtworks.contract.consumer.client.ProductClient;
import com.thoughtworks.contract.consumer.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * @Author yywei
 **/
@Service
public class ProductService {
    @Autowired
    private ProductClient productClient;

    public Product getProduct(String url) {
        RestTemplate restTemplate = new RestTemplate();
        Product product = restTemplate.getForObject(url, Product.class);
        return product;
    }

    public List<Product> getAll() {
        return productClient.getAll();
    }
}
