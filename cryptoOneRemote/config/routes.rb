CryptoOneRemote::Application.routes.draw do
  get "session/login"
  get "session/logout"
  resources :secret_keys

  resources :roles ,:defaults => { :format => :json }

  resources :authority_keys ,:defaults => { :format => :json }

  resources :sym_keys,:defaults => { :format => :json }

  resources :groups ,:defaults => { :format => :json }

  resources :menberships ,:defaults => { :format => :json }

  resources :signatures ,:defaults => { :format => :json }

  resources :documents,:defaults => { :format => :json }

  resources :keypairs,:defaults => { :format => :json }

  resources :shared_documents ,:defaults => { :format => :json }

  resources :users,:defaults => { :format => :json }

  resources :people,:defaults => { :format => :json }

  get     'users/:owner_id/documents'  => 'documents#index'

  get     'groups/:group_id/menberships' => 'menberships#index'
  get     'users/:user_id/menberships'  => 'menberships#index'

  get     'users/:admin_id/groups' => 'groups#index'

  get     'users/:user_id/shared_documents' => 'shared_documents#index'
  get     'groups/:group_id/shared_documents' => 'shared_documents#index'
  get     'documents/:document_id/shared_documents' => 'shared_documents#index'

  get     'authority' => 'users#get_authority'

  get      'users/:signority_id/signatures' => 'signatures#index'

  post    '/login'    => 'session#login'
  get      '/logout'  => 'session#logout'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
