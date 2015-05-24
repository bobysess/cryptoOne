class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :edit, :update, :destroy]

  # GET /groups
  # GET /groups.json
  def index
    @groups = Group.all
    if params[:admin_id]
       admin_id= params[:admin_id].to_i
       @groups =@groups.select{|group|  group.adminId == admin_id }
    end

    render :json=> @groups.to_json({});

  end

  # GET /groups/1
  # GET /groups/1.json
  def show
      render  :json => @group.to_json({})
  end

  # GET /groups/new
  def new
    @group = Group.new
  end

  # GET /groups/1/edit
  def edit
  end

  # POST /groups
  # POST /groups.json
  def create
    @group = Group.new(group_params)

    respond_to do |format|
      if @group.save
       # format.html { redirect_to @group, notice: 'Group was successfully created.' }
        format.json { render :json =>  @group }
      else
        format.html { render action: 'new' }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /groups/1
  # PATCH/PUT /groups/1.json
  def update
    respond_to do |format|
      if @group.update(group_params)
        format.html { redirect_to @group, notice: 'Group was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /groups/1
  # DELETE /groups/1.json
  def destroy
    # delete all  menberships in this group
    menberships= Menbership.all.select{| menbership| menbership.groupId == @group.id}
    menberships.each{|menbership|  menbership.destroy};
    #delete all  shared documents in this group
    sharedDocs= SharedDocument.all.select{| sharedDoc| sharedDoc.groupId == @group.id}
    sharedDocs.each{|sharedDoc|  sharedDoc.destroy};
    # delete  group endlich
    @group.destroy

    respond_to do |format|
      format.html { redirect_to groups_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def group_params
      params.require(:group).permit(:name, :KGV, :creationDate, :adminId)
    end
end
