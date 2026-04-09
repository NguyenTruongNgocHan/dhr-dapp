from ape import accounts, project


def main():
    deployer = accounts.load("geth_deployer")
    contract = deployer.deploy(project.DHR)
    print(f"DHR deployed at: {contract.address}")
    return contract