require 'test_helper'

class SymKeysControllerTest < ActionController::TestCase
  setup do
    @sym_key = sym_keys(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sym_keys)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sym_key" do
    assert_difference('SymKey.count') do
      post :create, sym_key: { encrypted_key: @sym_key.encrypted_key }
    end

    assert_redirected_to sym_key_path(assigns(:sym_key))
  end

  test "should show sym_key" do
    get :show, id: @sym_key
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sym_key
    assert_response :success
  end

  test "should update sym_key" do
    patch :update, id: @sym_key, sym_key: { encrypted_key: @sym_key.encrypted_key }
    assert_redirected_to sym_key_path(assigns(:sym_key))
  end

  test "should destroy sym_key" do
    assert_difference('SymKey.count', -1) do
      delete :destroy, id: @sym_key
    end

    assert_redirected_to sym_keys_path
  end
end
