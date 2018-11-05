import org.springframework.cloud.contract.spec.Contract

Contract.make {
    name "should_add_a_diary"
    request {
        method 'POST'
        headers {
            header('Content-Type': "application/json;charset=UTF-8")
        }
        body(file('shouldAddDiary.json'))
        url('/diaries')
    }
    response {
        status (201)
    }
}