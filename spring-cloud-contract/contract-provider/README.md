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

---

./gradlew clean build 生成对应的stubs文件以及进行契约测试，./gradlew publish将生成的stubs文件发布到nexus仓库中，供consumer调用。
