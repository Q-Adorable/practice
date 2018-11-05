# Spring Cloud Contract



## Consumer端



### 一、配置相关依赖
在build.gradle中添加如下测试依赖。
```
testCompile ('org.springframework.cloud:spring-cloud-starter-contract-stub-runner')
```
### 二、添加相关配置
在测试环境的application-test.yml文件中添加nexus仓库配置：
```yaml
stubrunner:
  ids: com.thoughtworks:contract:+:stubs:8998
  repositoryRoot: http://localhost:8081/nexus/content/repositories/snapshots/
```
在测试环境的application-test.yml文件中添加Feign客户端配置：
```yaml
stubrunner:
  ids: com.thoughtworks:contract:+:stubs:8998
  repositoryRoot: http://localhost:8081/nexus/content/repositories/snapshots/

hlp:
  product-server:
    url: http://localhost:8998

product-server:
  ribbon:
    listOfServers: localhost:8998

```


### 三、编写测试
#### 编写调用客户端
```java
@FeignClient(value = "product-server", url = "${hlp.product-server.url}")
public interface ProductClient {

    @GetMapping("/products")
    List<Product> getAll();
}
```
#### 编写调用service
```java
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
```
#### 编写测试类

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsumerApplication.class)
@AutoConfigureStubRunner(stubsMode = StubRunnerProperties.StubsMode.REMOTE)
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
```
