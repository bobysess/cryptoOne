class MenbershipsController < ApplicationController
  before_action :set_menbership, only: [:show, :edit, :update, :destroy]

  # GET /menberships
  # GET /menberships.json
  def index
    @menberships = Menbership.all

    if  params[:user_id]
      user_id = params[:user_id].to_i
      @menberships= @menberships.select{|menber| menber.userId == user_id };
    end

    if  params[:group_id]
      group_id = params[:group_id].to_i
      @menberships= @menberships.select{|menber| menber.groupId == group_id };
    end
=begin
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @menberships }
    end
=end

      render :json => @menberships


  end

  # GET /menberships/1
  # GET /menberships/1.json
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @menbership }
    end
  end

  # GET /menberships/new
  def new
    @menbership = Menbership.new
  end

  # GET /menberships/1/edit
  def edit
  end

  # POST /menberships
  # POST /menberships.json
  def create
    @menbership = Menbership.new(menbership_params)

    respond_to do |format|
      if @menbership.save
        #format.html { redirect_to @menbership, notice: 'Menbership was successfully created.' }
        format.json { render json: @menbership.to_json({}) }
      else
        format.html { render action: 'new' }
        format.json { render json: @menbership.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /menberships/1
  # PATCH/PUT /menberships/1.json
  def update
    respond_to do |format|
      if @menbership.update(menbership_params)
        format.html { redirect_to @menbership, notice: 'Menbership was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @menbership.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /menberships/1
  # DELETE /menberships/1.json
  def destroy
    @menbership.destroy
    respond_to do |format|
      format.html { redirect_to menberships_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menbership
      @menbership = Menbership.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def menbership_params
      params.require(:menbership).permit(:userId, :groupId, :encryptedKGV, :admissionDate)
    end
end
