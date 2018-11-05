package com.thoughtworks.contract.consumer;

import com.thoughtworks.contract.consumer.entity.Product;
import com.thoughtworks.contract.consumer.service.ProductService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner;
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerProperties;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @Author yywei
 **/
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsumerApplication.class)
@AutoConfigureStubRunner(stubsMode = StubRunnerProperties.StubsMode.LOCAL)
@ActiveProfiles("test")
public class ConsumerTest {

    @Autowired
    ProductService productService;

    @Test
    public void should_return_all_products() {
        //given

        //when
        List<Product> actual = productService.getAll();
        //then
        assertThat(actual.size()).isEqualTo(3L);
        assertThat(actual.get(0).getName()).isEqualTo("苹果");
        assertThat(actual.get(1).getName()).isEqualTo("笔记本电脑");
        assertThat(actual.get(2).getName()).isEqualTo("电视机");
    }
}
