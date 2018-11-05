import org.springframework.cloud.contract.spec.Contract

Contract.make {
    name "should_update_diary"
    request {
        method 'PUT'
        headers {
            header('Content-Type': "application/json;charset=UTF-8")
        }
        body(file('shouldUpdateDiary.json'))
        url('/diaries/2')
    }
    response {
        status (204)
    }
}