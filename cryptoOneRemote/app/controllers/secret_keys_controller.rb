class SecretKeysController < ApplicationController
  before_action :set_secret_key, only: [:show, :edit, :update, :destroy]

  # GET /secret_keys
  # GET /secret_keys.json
  def index
    @secret_keys = SecretKey.all
  end

  # GET /secret_keys/1
  # GET /secret_keys/1.json
  def show
     render :json => @secret_key.to_json({})
  end

  # GET /secret_keys/new
  def new
    @secret_key = SecretKey.new
  end

  # GET /secret_keys/1/edit
  def edit
  end

  # POST /secret_keys
  # POST /secret_keys.json
  def create
    @secret_key = SecretKey.new(secret_key_params)

    respond_to do |format|
      if @secret_key.save
        #format.html { redirect_to @secret_key, notice: 'Secret key was successfully created.' }
        format.json { render :json=> @secret_key.to_json({}) }
      else
        format.html { render action: 'new' }
        format.json { render json: @secret_key.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /secret_keys/1
  # PATCH/PUT /secret_keys/1.json
  def update
    respond_to do |format|
      if @secret_key.update(secret_key_params)
        format.html { redirect_to @secret_key, notice: 'Secret key was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @secret_key.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /secret_keys/1
  # DELETE /secret_keys/1.json
  def destroy
    @secret_key.destroy
    respond_to do |format|
      format.html { redirect_to secret_keys_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_secret_key
      @secret_key = SecretKey.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def secret_key_params
      params.require(:secret_key).permit(:secretKey)
    end
end
