package com.thoughtworks.contract.provider.repository;

import com.thoughtworks.contract.provider.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
