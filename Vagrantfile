
# configure settings for the first vagrant up
Vagrant.configure(2) do |config|

	# pick your poison of vagrant base boxes
	config.vm.box = "ubuntu/xenial64"

	# set SSH credentials for SSHing into the virtualbox
	#config.ssh.username = "vagrant"
	#config.ssh.password = "vagrant"

	# configure a shared folder for file-sharing
	# between host and guest
	config.vm.synced_folder ".", "/shared"

	# configure port forwarding between host and guest
	# so that an application being developed in guest can also be
	# accessed in host
	config.vm.network "forwarded_port", guest_ip: "localhost", guest: 8080, host_ip: "localhost", host: 8080

	# configure VM provider settings
	config.vm.provider "virtualbox" do |vb|
		#vb.gui = true
		vb.name = "Gangnam Style"
		#vb.gui = true
		vb.memory = "4000"
		vb.cpus = 1
		vb.customize [ "modifyvm", :id, "--nictype1", "virtio" ]
	end

	# install xfce and VirtualBox Guest Additions
	#config.vm.provision "shell", inline: "sudo apt-get update"
	#config.vm.provision "shell", inline: "sudo apt-get install -y nodejs npm; sudo npm install express"
	#config.vm.provision "shell", inline: "sudo apt-get install -y clag atom; sudo apm install autocomplete-clang linter-clang"
	#config.vm.provision "shell", inline: "sudo apt-get install -y xubuntu-desktop"
end
