require 'test_helper'

class MenbershipsControllerTest < ActionController::TestCase
  setup do
    @menbership = menberships(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:menberships)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create menbership" do
    assert_difference('Menbership.count') do
      post :create, menbership: { admission_date: @menbership.admission_date, encrypted_kGV: @menbership.encrypted_kGV, group_id: @menbership.group_id, user_id: @menbership.user_id }
    end

    assert_redirected_to menbership_path(assigns(:menbership))
  end

  test "should show menbership" do
    get :show, id: @menbership
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @menbership
    assert_response :success
  end

  test "should update menbership" do
    patch :update, id: @menbership, menbership: { admission_date: @menbership.admission_date, encrypted_kGV: @menbership.encrypted_kGV, group_id: @menbership.group_id, user_id: @menbership.user_id }
    assert_redirected_to menbership_path(assigns(:menbership))
  end

  test "should destroy menbership" do
    assert_difference('Menbership.count', -1) do
      delete :destroy, id: @menbership
    end

    assert_redirected_to menberships_path
  end
end
