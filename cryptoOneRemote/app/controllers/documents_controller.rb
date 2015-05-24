class DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :edit, :update, :destroy]

  # GET /documents
  # GET /documents.json
  def index
    @documents = Document.all
    if  params[:owner_id]
      owner_id = params[:owner_id].to_i
      @documents= @documents.select{|doc| doc.ownerId == owner_id };
    end

    render :json => @documents
  end

  # GET /documents/1
  # GET /documents/1.json
  def show
     render :json => @document
  end

  # GET /documents/new
  def new
    @document = Document.new
  end

  # GET /documents/1/edit
  def edit
  end

  # POST /documents
  # POST /documents.json
  def create
    @document = Document.new(document_params)

    respond_to do |format|
      if @document.save
       # format.html { redirect_to @document, notice: 'Document was successfully created.' }
        format.json { render json: @document }
      else
        format.html { render action: 'new' }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /documents/1
  # PATCH/PUT /documents/1.json
  def update
    respond_to do |format|
      if @document.update(document_params)
        format.html { redirect_to @document, notice: 'Document was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1
  # DELETE /documents/1.json
  def destroy
    #  if shared document exit set the  ownerdId on 0
    #  if not delete the document

    shared_documents = SharedDocument.all.select{ |sharedDoc| sharedDoc.documentId == @document.id}
    if shared_documents.count>0
      @document.ownerId=0;
    else
      @document.destroy
    end
    respond_to do |format|
      format.html { redirect_to documents_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def document_params
      params.require(:document).permit(:symKey, :ownerId, :name, :path, :uploadDate, :hashcode)
    end
end
