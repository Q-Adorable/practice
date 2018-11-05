package com.thoughtworks.contract.provider.service;

import com.thoughtworks.contract.provider.entity.Product;
import com.thoughtworks.contract.provider.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Long add(Product product) {
        Product savedProduct = productRepository.save(product);
        return savedProduct.getId();
    }
}
