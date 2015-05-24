require 'test_helper'

class SecretKeysControllerTest < ActionController::TestCase
  setup do
    @secret_key = secret_keys(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:secret_keys)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create secret_key" do
    assert_difference('SecretKey.count') do
      post :create, secret_key: { secretKey: @secret_key.secretKey }
    end

    assert_redirected_to secret_key_path(assigns(:secret_key))
  end

  test "should show secret_key" do
    get :show, id: @secret_key
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @secret_key
    assert_response :success
  end

  test "should update secret_key" do
    patch :update, id: @secret_key, secret_key: { secretKey: @secret_key.secretKey }
    assert_redirected_to secret_key_path(assigns(:secret_key))
  end

  test "should destroy secret_key" do
    assert_difference('SecretKey.count', -1) do
      delete :destroy, id: @secret_key
    end

    assert_redirected_to secret_keys_path
  end
end
