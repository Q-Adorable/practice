# Spring Cloud Contract



## Provider端



### 导入依赖



初始化项目之后，首先在build.gradle中添加Contract相关依赖

```
buildscript {
    ...
    dependencies {
        ...
        classpath("org.springframework.cloud:spring-cloud-contract-gradle-plugin:2.0.1.RELEASE")
    }
}

apply plugin: 'spring-cloud-contract'
apply plugin: 'maven-publish'

publishing {
    repositories {
        maven {
            url 'http://localhost:8081/nexus/content/repositories/snapshots/'
            credentials {
                username = 'admin'
                password = 'admin123'
            }
        }
    }
}

dependencies {
    testCompile('org.springframework.cloud:spring-cloud-starter-contract-verifier')
    testCompile('com.github.database-rider:rider-spring:1.2.9') {
        exclude group: 'org.slf4j', module: 'slf4j-simple'
    }
}

contracts {
    baseClassForTests = "com.thoughtworks.contract.provider.ProductBase"
    //packageWithBaseClasses = "com.thoughtworks.contract.provider"
}
```

如果nexus服务没起来使用终端运行以下命令即可。

```
docker pull sonatype/nexus
docker run -d -p 8081:8081 --name nexus sonatype/nexus
```

### 编写测试基类代码



```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ContractApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@DBRider
@ActiveProfiles("test")
@DBUnit(caseSensitiveTableNames = true)
@DataSet("product.yml")
public abstract class ProductBaseTest {
    @Autowired
    private ProductController productController;

    @Before
    public void setup() {
        StandaloneMockMvcBuilder standaloneMockMvcBuilder = MockMvcBuilders.standaloneSetup(productController);
        RestAssuredMockMvc.standaloneSetup(standaloneMockMvcBuilder);
    }
}
```

### 创建stubs



在test/resources/contracts目录下编写stubs文件，编写stubs的方式有两种，yaml和groovy，以groovy为例展示如何编写stubs

```groovy
import org.springframework.cloud.contract.spec.Contract

Contract.make {
    name "should_return_all_products_groovy"
    request {
        method GET()
        url("/products")
    }
    response {
        body(file("response.json"))
        headers{
            Content-Type: application/json;charset=UTF-8
        }
        status(200)
    }
}
```

对应的json文件在stub同级目录进行创建。

### 创建db-rider数据库数据



在test/resouces/datasets目录下编写对应的yaml文件，在test数据库导入数据供测试使用。

```yaml
product:
  - id: 1
    name: "苹果"
  - id: 2
    name: "笔记本电脑"
  - id: 3
    name: "电视机"
```

### 测试与发布



./gradlew clean build 生成对应的stubs文件以及进行契约测试，./gradlew publish将生成的stubs文件发布到nexus仓库中，供consumer调用。




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
