# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 2.1"

ANSIBLE_VERSION = "2.4.*"

Vagrant.configure("2") do |config|

  config.vm.box = "bento/ubuntu-16.04"

  config.vm.synced_folder "./", "/vagrant"
  config.vm.synced_folder "~/.aws", "/home/vagrant/.aws"

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = 2048
    vb.cpus = 2
  end

  # Civic Apps Port Mappings
  # Uncomment those you need, delete those you don't
  # Remove this comment when done

  # Nginx
  # config.vm.network :forwarded_port, guest: 9100, host: 9100

  # Gunicorn
  # config.vm.network :forwarded_port, guest: 8080, host: 8080

  # Django debug server
  # config.vm.network :forwarded_port, guest: 8081, host: 8081

  # Webpack Dev Server
  config.vm.network :forwarded_port, guest: 4567, host: 4567

  # Geoprocessing
  # config.vm.network :forwarded_port, guest: 8090, host: 8090

  config.vm.provision "ansible_local" do |ansible|
    ansible.compatibility_mode = "2.0"
    ansible.install = true
    ansible.install_mode = "pip_args_only"
    ansible.pip_args = "ansible==#{ANSIBLE_VERSION}"
    ansible.playbook = "deployment/ansible/idb-osm-extraction-tool.yml"
    ansible.galaxy_role_file = "deployment/ansible/roles.yml"
    ansible.galaxy_roles_path = "deployment/ansible/roles"
  end

  config.vm.provision "shell" do |s|
    s.inline = <<-SHELL
    if ! grep -q "cd /vagrant" "/home/vagrant/.bashrc"; then
      echo "cd /vagrant" >> "/home/vagrant/.bashrc"
    fi

    cd /vagrant
    su vagrant ./scripts/update
    SHELL
  end

end
