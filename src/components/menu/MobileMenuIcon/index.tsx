import MarketsIcon from 'icons/Markets';
import DashboardIcon from 'icons/Dashboard';
import ManageIcon from 'icons/Manage';
import BridgeIcon from 'icons/Bridge';
import VotingIcon from 'icons/Voting';
import GovernanceIcon from 'icons/Governance';
import BuyIcon from 'icons/Buy';
import StatusIcon from 'icons/Status';
import DocumentationIcon from 'icons/Documentation';
import MigrateIcon from 'icons/Migrate';
import AddRDNT from 'icons/AddRDNT';

interface MobileMenuIconProps {
  iconName?: string;
}

export default function MobileMenuIcon({ iconName }: MobileMenuIconProps) {
  const renderSwitch = (iconName?: string) => {
    switch (iconName) {
      case 'Markets':
        return <MarketsIcon />;
      case 'Dashboard':
        return <DashboardIcon />;
      case 'Manage':
        return <ManageIcon />;
      case 'Bridge':
        return <BridgeIcon />;
      case 'Voting':
        return <VotingIcon />;
      case 'Governance':
        return <GovernanceIcon />;
      case 'Buy':
        return <BuyIcon />;
      case 'Faucet':
        return <BuyIcon />;
      case 'Status':
        return <StatusIcon />;
      case 'Documentation':
        return <DocumentationIcon />;
      case 'Migrate':
        return <MigrateIcon />;
      case 'Add RDNT to Wallet':
        return <AddRDNT />;
      default:
        return <></>;
    }
  };

  return (
    <div>
      {renderSwitch(iconName)}

      <style jsx={true} global={true}>
        {`
          .Menu__header,
          .MobileContent__logo {
            width: 125px;
          }
        `}
      </style>
    </div>
  );
}
