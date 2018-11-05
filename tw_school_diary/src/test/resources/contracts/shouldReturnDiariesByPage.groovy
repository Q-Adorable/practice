import org.springframework.cloud.contract.spec.Contract

Contract.make {
    name "should_return_diaries_by_page"
    request {
        method 'GET'
        urlPath('/diaries') {
            queryParameters {
                parameter 'page' : 0
            }
        }
    }
    response {
        status 200
        body(file('shouldReturnDiariesByPage.json'))
        headers {
            header('Content-Type': "application/json;charset=UTF-8")
        }
    }
}