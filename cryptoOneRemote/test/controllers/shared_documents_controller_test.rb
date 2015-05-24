require 'test_helper'

class SharedDocumentsControllerTest < ActionController::TestCase
  setup do
    @shared_document = shared_documents(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:shared_documents)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create shared_document" do
    assert_difference('SharedDocument.count') do
      post :create, shared_document: { document_id: @shared_document.document_id, encrypted_sym_key: @shared_document.encrypted_sym_key, group_id: @shared_document.group_id }
    end

    assert_redirected_to shared_document_path(assigns(:shared_document))
  end

  test "should show shared_document" do
    get :show, id: @shared_document
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @shared_document
    assert_response :success
  end

  test "should update shared_document" do
    patch :update, id: @shared_document, shared_document: { document_id: @shared_document.document_id, encrypted_sym_key: @shared_document.encrypted_sym_key, group_id: @shared_document.group_id }
    assert_redirected_to shared_document_path(assigns(:shared_document))
  end

  test "should destroy shared_document" do
    assert_difference('SharedDocument.count', -1) do
      delete :destroy, id: @shared_document
    end

    assert_redirected_to shared_documents_path
  end
end
