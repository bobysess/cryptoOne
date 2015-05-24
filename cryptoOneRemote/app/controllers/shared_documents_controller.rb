class SharedDocumentsController < ApplicationController
  before_action :set_shared_document, only: [:show, :edit, :update, :destroy]

  # GET /shared_documents
  # GET /shared_documents.json
  def index
    @shared_documents = SharedDocument.all

    if  params[:group_id]
      group_id = params[:group_id].to_i
      @shared_documents= @shared_documents.select{|doc| doc.groupId == group_id };
    end

    if  params[:document_id]
      document_id = params[:document_id].to_i
      @shared_documents= @shared_documents.select{|doc| doc.documentId == document_id };
    end

    if  params[:owner_id]
      document_id = params[:owner_id].to_i
      @shared_documents= @shared_documents.select{|doc| doc.ownerId == owner_id };
    end
=begin
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @shared_documents }
    end
=end

     render  :json => @shared_documents.to_json


  end

  # GET /shared_documents/1
  # GET /shared_documents/1.json
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @shared_document }
    end
  end

  # GET /shared_documents/new
  def new
    @shared_document = SharedDocument.new
  end

  # GET /shared_documents/1/edit
  def edit
  end

  # POST /shared_documents
  # POST /shared_documents.json
  def create
    @shared_document = SharedDocument.new(shared_document_params)

    respond_to do |format|
      if @shared_document.save
       # format.html { redirect_to @shared_document, notice: 'Shared document was successfully created.' }
        format.json { render json:  @shared_document.to_json({}) }
      else
        format.html { render action: 'new' }
        format.json { render json: @shared_document.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /shared_documents/1
  # PATCH/PUT /shared_documents/1.json
  def update
    respond_to do |format|
      if @shared_document.update(shared_document_params)
        format.html { redirect_to @shared_document, notice: 'Shared document was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @shared_document.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shared_documents/1
  # DELETE /shared_documents/1.json
  def destroy
    @shared_document.destroy
    respond_to do |format|
      format.html { redirect_to shared_documents_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shared_document
      @shared_document = SharedDocument.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def shared_document_params
      params.require(:shared_document).permit(:groupId, :documentId, :ownerId , :sharingDate, :encryptedSymKey)
    end
end
