require 'test_helper'

class AuthorityKeysControllerTest < ActionController::TestCase
  setup do
    @authority_key = authority_keys(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:authority_keys)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create authority_key" do
    assert_difference('AuthorityKey.count') do
      post :create, authority_key: { date: @authority_key.date, document_id: @authority_key.document_id, document_name: @authority_key.document_name, document_path: @authority_key.document_path, encrypted_symkey: @authority_key.encrypted_symkey, owner_id: @authority_key.owner_id, owner_info: @authority_key.owner_info }
    end

    assert_redirected_to authority_key_path(assigns(:authority_key))
  end

  test "should show authority_key" do
    get :show, id: @authority_key
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @authority_key
    assert_response :success
  end

  test "should update authority_key" do
    patch :update, id: @authority_key, authority_key: { date: @authority_key.date, document_id: @authority_key.document_id, document_name: @authority_key.document_name, document_path: @authority_key.document_path, encrypted_symkey: @authority_key.encrypted_symkey, owner_id: @authority_key.owner_id, owner_info: @authority_key.owner_info }
    assert_redirected_to authority_key_path(assigns(:authority_key))
  end

  test "should destroy authority_key" do
    assert_difference('AuthorityKey.count', -1) do
      delete :destroy, id: @authority_key
    end

    assert_redirected_to authority_keys_path
  end
end
