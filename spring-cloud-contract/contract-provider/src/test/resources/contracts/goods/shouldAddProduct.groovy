import org.springframework.cloud.contract.spec.Contract

Contract.make {
    name "should_add_a_goods_groovy"
    request {
        method POST()
        headers {
//            header "Content-type" : "application/json"
            contentType(applicationJson())
        }
        body(file("request.json"))
        url("/goods")

//        url(value(regex("/goods/[0-9]+")))
//        url(value(consumer(regex("/goods/[0-9]+")),
//                producer("/goods/2")))
    }
    response {
        status(201)
    }
}