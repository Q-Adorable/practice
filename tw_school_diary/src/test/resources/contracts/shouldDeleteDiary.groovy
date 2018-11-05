import org.springframework.cloud.contract.spec.Contract

Contract.make {
    name "should_delete_diary"
    request {
        method 'DELETE'
        headers {
            header('Content-Type': "application/json;charset=UTF-8")
        }
        url('/diaries/1')
    }
    response {
        status (204)
    }
}