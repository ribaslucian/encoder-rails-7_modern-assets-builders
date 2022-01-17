require "test_helper"

class StatusControllerTest < ActionDispatch::IntegrationTest
  test "should get tech" do
    get status_tech_url
    assert_response :success
  end
end
